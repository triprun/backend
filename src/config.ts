export const Config = {
  mdb_link: 'mongodb://localhost/mongotrip',
  pdb_host: 'localhost',
  pdb_port: 5432,
  pdb_username: 'postgres',
  pdb_password: 'postgres',
  pdb_name: 'triprun',
  pdb_dialect: 'postgres',
  redis_host: 'localhost',
  redis_port: 6379,
  salt_sha: 'ASDHjuhs7899sadhqSDHhkoashdjsklahDJSKLDHNKLJnkNd2jn2doJKDSPSJDPISAjdipj2ipjdijID',
  salt_sha_access: 'ASDJLH98SADH(SAUIDH&(ASDH@2uhd29PDSAuoihO@H!hSUHDSADUhASUDHASUDHsuadhDSHASDH(APASF',
  salt_sha_refresh: 'IJISADJ78ASFHiBCQA((XCHCHkljNWKJN@JLnLNDlndDD@LDQL21el;1ASPduHSADbcsbu312u2TWFD12K@N',
  jwt_key_access: 'YqywyeASIJDi8saDJIOSADlASFJf2asopdjkpoOSAIFif123fIJFOsoiajsdij@D@ads[pkdiasojhASOUIFHAOSUHDouD@O',
  jwt_key_refresh: 'LJKASHuhd2iouHLD@h@!!o;iSAHDSAOHDuiHDIGASIdyAKSDygyGD827dg28dg9218egd1i9hdiulHSAILUHDiuHdsiusahdpoSHDpASUHD98pd2h',
  access_token_expire_at: 60 * 30 * 999, // seconds
  refresh_token_expire_at: 60 * 60 * 24 * 3, // seconds
  upload_images_path: './public/uploads/',
  upload_images_path_response: '/public/uploads/',
  upload_images_file_size: 1024 * 1024 * 10, // bytes
};
