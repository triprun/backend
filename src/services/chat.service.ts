import { Injectable, Inject, HttpException} from '@nestjs/common';
import { Model } from 'mongoose';
import { Consts } from '../consts';
import { RedisService } from 'nestjs-redis';
import { UserService } from './user.service';
import { IDialog } from '../schemas/dialog.interface';
import { IMessage } from '../schemas/message.interface';
import moment = require('moment');

import {AuthService} from './auth.service';

@Injectable()
export class ChatService {

  constructor(
    @Inject(Consts.dialog_rep)
    private readonly dialogModel: Model<IDialog>,
    @Inject(Consts.message_rep)
    private readonly messageModel: Model<IMessage>,

    private readonly redisService: RedisService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }

  async send(body, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const now = moment().unix();
    let dm = null;

    // ищем диалог loopback
    if ( body.refType === 'loopback' ) {

      const res = await this.dialogModel.find({
        refType: 'loopback',
        author: query.userId,
      });

      if (!res.length) {
        dm = new this.dialogModel({
          ref: '',
          name: '',
          refType: 'loopback',
          created_at: now,
          updated_at: now,
          author: query.userId,
          members: [query.userId],
        });
        dm = await dm.save();
      } else {
        dm = res[0];
      }

    }

    // ищем диалог user
    if ( body.refType === 'user' ) {

      if ( body.ref === query.userId ) {
        throw new HttpException(Consts.ERROR_DIALOG_NOT_FOUND, 403);
      }

      const res = await this.dialogModel.find({
        refType: 'user',
        members: {$all: [query.userId, body.ref]},
      });

      if (!res.length) {
        dm = new this.dialogModel({
          ref: body.ref,
          name: '',
          refType: 'user',
          created_at: now,
          updated_at: now,
          author: query.userId,
          members: [query.userId, body.ref],
        });
        dm = await dm.save();
      } else {
        dm = res[0];
      }

    }

    // ищем диалог conversation
    if ( body.refType === 'conversation' ) {

      const res = await this.dialogModel.find({
        refType: 'conversation',
        ref: body.ref,
      });

      if (!res.length) {
        throw new HttpException(Consts.ERROR_DIALOG_NOT_FOUND, 403);
      } else {
        dm = res[0];
      }

    }

    // ищем диалог conversation
    if ( body.refType === 'marschroute' ) {

      const res = await this.dialogModel.find({
        refType: 'marschroute',
        ref: body.ref,
      });

      if (!res.length) {
        throw new HttpException(Consts.ERROR_DIALOG_NOT_FOUND, 403);
      } else {
        dm = res[0];
      }

    }

    if ( dm === null ) {
      throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 403);
    }

    // добавляем сообщение
    const res3 = new this.messageModel({
      dialogId: dm._id,
      author: query.userId,
      created_at: now,
      updated_at: now,
      text: body.text,
      readMembers: [query.userId],
      deleteForMe: false,
      deleteForAll: false,
      modified: false,
    });
    await res3.save();

    return {};
  }

  async dialogList(query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }

    let conditions = {};
    if ( query.refType === 'all' ) {
      conditions = {
        members: { $in: [query.userId]},
      };
    }
    if ( query.refType === 'loopback' ) {
      conditions = {
        members: { $in: [query.userId]},
        type: 'loopback',
      };
    }
    if ( query.refType === 'user' ) {
      conditions = {
        members: { $in: [query.userId]},
        type: 'user',
      };
    }
    if ( query.refType === 'conversation' ) {
      conditions = {
        members: { $in: [query.userId]},
        type: 'conversation',
      };
    }
    if ( query.refType === 'marschroute' ) {
      conditions = {
        members: { $in: [query.userId]},
        type: 'marschroute',
      };
    }

    let limit = 20;
    let skip = 0;

    if ( typeof query.limit !== 'undefined' ) {
      limit = query.limit;
    }

    if ( typeof query.skip !== 'undefined' ) {
      skip = query.skip;
    }

    const res = await this.dialogModel.find({
      ...conditions,
    }).sort({updated_at: 'desc'}).skip(Number(skip)).limit(Number(limit));

    let unread = 0;
    const result = [];
    for( let i = 0; i < res.length; i++ ) {
      const dialog = await this.dialogById({
        ref: res[i].ref,
        refType: res[i].refType,
      }, {
        accessToken: query.accessToken,
        userId: query.userId,
        limit: 1,
      });
      if ( dialog.unreadCount > 0 ) {
        unread++;
      }
      result.push({
        dialog: res[i],
        lastMessage: dialog,
      });
    }

    return {
      dialogs: result,
      unreadDialogs: unread,
    };
  }

  async dialogById(params, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const now = moment().unix();
    let dm = null;

    // ищем диалог loopback
    if ( params.refType === 'loopback' ) {

      const res = await this.dialogModel.find({
        refType: 'loopback',
        author: query.userId,
      });

      if (!res.length) {
        throw new HttpException(Consts.ERROR_DIALOG_NOT_FOUND, 403);
      } else {
        dm = res[0];
      }

    }

    // ищем диалог user
    if ( params.refType === 'user' ) {

      if ( query.userId === params.ref ) {
        throw new HttpException(Consts.ERROR_DIALOG_NOT_FOUND, 403);
      }

      const res = await this.dialogModel.find({
        refType: 'user',
        members: {$all: [query.userId, params.ref]},
      });

      if (!res.length) {
        throw new HttpException(Consts.ERROR_DIALOG_NOT_FOUND, 403);
      } else {
        dm = res[0];
      }

    }

    // ищем диалог conversation
    if ( params.refType === 'conversation' ) {

      const res = await this.dialogModel.find({
        refType: 'conversation',
        ref: params.ref,
      });

      if (!res.length) {
        throw new HttpException(Consts.ERROR_DIALOG_NOT_FOUND, 403);
      } else {
        dm = res[0];
      }

    }

    // ищем диалог conversation
    if ( params.refType === 'marschroute' ) {

      const res = await this.dialogModel.find({
        refType: 'marschroute',
        ref: params.ref,
      });

      if (!res.length) {
        throw new HttpException(Consts.ERROR_DIALOG_NOT_FOUND, 403);
      } else {
        dm = res[0];
      }

    }

    if ( dm === null ) {
      throw new HttpException(Consts.ERROR_REQUIRED_FIELDS, 403);
    }

    let limit = 20;
    let skip = 0;
    let read = 0;
    let unread = 0;

    if ( typeof query.limit !== 'undefined' ) {
      limit = query.limit;
    }

    if ( typeof query.skip !== 'undefined' ) {
      skip = query.skip;
    }

    if ( typeof query.read !== 'undefined' ) {
      read = query.read;
    }

    if ( Number(read) === 1 ) {
      const nrd = await this.messageModel.find({
        readMembers: { $ne: query.userId },
        dialogId: dm._id,
      });
      for( let i = 0; i < nrd.length; i++ ) {
        const arr = nrd[i].readMembers;
        arr.push(query.userId);
        await this.messageModel.findByIdAndUpdate({
          _id: nrd[i]._id,
        }, {
          updated_at: now,
          readMembers: arr,
        });
      }
    }

    const messages = await this.messageModel.find({
      dialogId: dm._id,
    }, {}, {
      sort: {updated_at: -1},
    }).skip(Number(skip)).limit(Number(limit));

    if ( Number(read) !== 1 ) {
      const mms = await this.messageModel.find({
        dialogId: dm._id,
        readMembers: { $ne: query.userId },
      });
      unread = mms.length;
    }

    return {
      messages: messages,
      unreadCount: unread,
    };
  }

  async _dialogUpsertMarschroute(data): Promise<any> {
    const now = moment().unix();
    const members_ = [];
    members_.push(String(data.author));
    data.companions.forEach((item) => {
      members_.push(item.id);
    });
    const res = await this.dialogModel.find({
      ref: data._id,
      refType: 'marschroute',
    });
    if (!res.length) {
      const dm = new this.dialogModel({
        ref: data._id,
        refType: 'marschroute',
        name: data.name,
        created_at: now,
        updated_at: now,
        author: String(data.author),
        members: members_,
      });
      await dm.save();
    } else {
      await this.dialogModel.update({
        ref: data._id,
        refType: 'marschroute',
      }, {
        updated_at: now,
        members: members_,
        name: data.name,
      });
    }
  }

  async groupCreate(body, query): Promise<any> {
    if (await this.authService.checkAccessToken(query.accessToken) === false) {
      throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
    }
    const now = moment().unix();
    body.members.push(query.userId);
    let dm = new this.dialogModel({
      ref: '',
      name: body.name,
      refType: 'conversation',
      created_at: now,
      updated_at: now,
      author: query.userId,
      members: body.members,
    });
    dm = await dm.save();
    await this.dialogModel.update({
      _id: dm._id,
      refType: 'conversation',
    }, {
      ref: dm._id,
    });
    dm = await this.dialogModel.findById({
      _id: dm._id,
    });
    return dm;
  }

  /*
    async groupRemove(body, query): Promise<any> {
      if (await this.authService.checkAccessToken(query.accessToken) === false) {
        throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
      }
      const dm = await this.dialogModel.findById(body.id).exec();
      if ( dm.author !== query.userId ) {
        throw new HttpException(Consts.ERROR_FORBIDDEN, 403);
      }
      await dm.remove();
      return {};
    }

    async groupSend(body, query): Promise<any> {
      if (await this.authService.checkAccessToken(query.accessToken) === false) {
        throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
      }
      const now = moment().unix();

      // ищем диалог
      const res = await this.dialogModel.findOne({
        type: 'group',
        _id: body.id,
      });

      // проверяем, если ли текущий пользователь в диалоге
      if ( res.members.indexOf( query.userId ) === -1 ) {
        throw new HttpException(Consts.ERROR_FORBIDDEN, 403);
      }

      const arr = res.members;
      arr.splice(arr.indexOf( query.userId ), 1);
      // помечаем диалог как "есть не прочитанное сообщение" для получателей
      await this.dialogModel.findOneAndUpdate({
        _id: res._id,
      }, {
        notificationMembers: arr,
        updated_at: now,
      });

      // добавляем сообщение
      const res3 = new this.messageModel({
        dialogId: res._id,
        author: query.userId,
        created_at: now,
        updated_at: now,
        text: body.text,
        readMembers: [query.userId],
        deleteForMe: false,
        deleteForAll: false,
        modified: false,
      });
      await res3.save();
      return {};
    }

    async dialogList( query): Promise<any> {
      if (await this.authService.checkAccessToken(query.accessToken) === false) {
        throw new HttpException(Consts.ERROR_ACCESS_TOKEN, 401);
      }

      let conditions = {};
      if ( query.type === 'all' ) {
        conditions = {
          members: { $in: [query.userId]},
        };
      }
      if ( query.type === 'private' ) {
        conditions = {
          members: { $in: [query.userId]},
          type: 'private',
        };
      }
      if ( query.type === 'group' ) {
        conditions = {
          members: { $in: [query.userId]},
          type: 'group',
        };
      }
      if ( query.type === 'marschroute' ) {
        conditions = {
          members: { $in: [query.userId]},
          type: 'marschroute',
        };
      }
      const res = await this.dialogModel.find({
        ...conditions,
      }).sort({updated_at: 'desc'}).skip(Number(query.skip)).limit(Number(query.limit));

      const obj: any[] = [];
      let noReadCount = 0;

      for (let i = 0; i < res.length; i++) {
        obj.push({
          _id: res[i]._id,
          members: res[i].members,
          notificationMembers: res[i].notificationMembers,
          name: res[i].name,
          type: res[i].type,
          created_at: res[i].created_at,
          updated_at: res[i].updated_at,
          author: res[i].author,
          noRead: false,
        });

        if ( res[i].notificationMembers.indexOf(query.userId) + 1 ) {
          obj[i].noRead = true;
          noReadCount++;
        }
        // вытаскиваем последнее сообщение
        const mm = await this.messageModel.find({
          dialogId: res[i]._id,
        }, {}, {
          sort: {updated_at: -1},
        }).limit(1);
        if ( mm.length + 1 ) {
          obj[i].lastMessage = mm[0];
        } else {
          obj[i].lastMessage = null;
        }
      }
      return {
        noReadCount: noReadCount,
        dialogs: obj,
      };
    }
  */
}
