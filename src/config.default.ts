export const Config = {
  mdb_link: 'mongodb://127.0.0.1/xx',
  pdb_host: 'localhost',
  pdb_port: 5432,
  pdb_username: '',
  pdb_password: '',
  pdb_name: '',
  pdb_dialect: 'postgres',
  redis_host: 'localhost',
  redis_port: 6379,
  salt_sha: '',
  salt_sha_access: '',
  salt_sha_refresh: '',
  jwt_key_access: '',
  jwt_key_refresh: '',
  access_token_expire_at: 60 * 30, // seconds
  refresh_token_expire_at: 60 * 60 * 24 * 3, // seconds
  upload_images_path: './public/uploads/',
  upload_images_file_size: 1024 * 1024 * 10, // bytes
};
