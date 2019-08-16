require('dotenv').config();

export const Config = {
    pdb_host: 'postgres',
    pdb_port: 5432,
    pdb_username: process.env.POSTGRES_USER,
    pdb_password: process.env.POSTGRES_PASSWORD,
    pdb_name: process.env.POSTGRES_DB,
    pdb_dialect: 'postgres',
    mdb_link: 'mongodb://mongo/nest',
    redis_host: 'redis',
    redis_port: 6379,
    salt_sha: 'ASDHjuhs7899sadhqSDHhkoashdjsklahDJSKLDHNKLJnkNd2jn2doJKDSPSJDPISAjdipj2ipjdijID',
    salt_sha_access: 'ASDJLH98SADH(SAUIDH&(ASDH@2uhd29PDSAuoihO@H!hSUHDSADUhASUDHASUDHsuadhDSHASDH(APASF',
    salt_sha_refresh: 'IJISADJ78ASFHiBCQA((XCHCHkljNWKJN@JLnLNDlndDD@LDQL21el;1ASPduHSADbcsbu312u2TWFD12K@N',
    jwt_key_access: 'YqywyeASIJDi8saDJIOSADlASFJf2asopdjkpoOSAIFif123fIJFOsoiajsdij@D@ads[pkdiasojhASOUIFHAOSUHDouD@O',
    jwt_key_refresh: 'LJKASHuhd2iouHLD@h@!!o;iSAHDSAOHDuiHDIGASIdyAKSDygyGD827dg28dg9218egd1i9hdiulHSAILUHDiuHdsiusahdpoSHDpASUHD98pd2h',
    access_token_expire_at: 60 * 30, // seconds
    refresh_token_expire_at: 60 * 60 * 24 * 3, // seconds
    upload_images_path: './public/uploads/',
    upload_images_file_size: 1024 * 1024 * 10, // bytes
};
