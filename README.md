# film-role-recognition-fe

Bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## baseConfig.json

运行/部署之前需把 `./src/baseConfig.json` 中的 `baseSocketURL` 改为 `server` 使用的 URL

## 注意！

由于测试环境中 `server` 地址经常变化，因此暂用 `npm start` 的方式来运行程序。实际部署中应运行 `npm build` 后使用 `nginx` 进行部署。
