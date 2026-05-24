# FoxCloud 能源仪表盘

这是一个适合初学者使用的家庭能源仪表盘，可以通过 FoxCloud OpenAPI 或本地只读 Modbus TCP 读取逆变器、电池和用电数据。

设计目标是：安全、简单、容易部署，并且适合其他 Fox ESS / FoxCloud 用户克隆后自行配置使用。

网页会在当前浏览器本地记住你选择的语言和表格范围。

如果遇到问题，请先看 [Troubleshooting Guide](docs/troubleshooting.md)。

## 重要安全提醒

- 不要把真实 API key、FoxCloud 密码、GitHub 密码、逆变器完整序列号提交到 GitHub。
- 不要把 `.env`、SQLite 数据库、备份文件上传到 GitHub。
- API key 和密码只放在服务器端 `.env` 文件里，不要写进前端 JavaScript。
- 如果要开放到互联网，请使用 HTTPS、反向代理和仪表盘登录密码。

## 支持的运行方式

- macOS
- Windows
- Linux
- Docker / Synology Container Manager

## 两种数据来源

### FoxCloud 模式

使用 FoxCloud OpenAPI。优点是容易开始，适合大多数用户。缺点是依赖互联网和 FoxCloud API 限制。

```dotenv
DATA_PROVIDER=foxcloud
FOXCLOUD_BASE_URL=https://www.foxesscloud.com
FOXCLOUD_DEMO_MODE=false
FOXCLOUD_API_KEY=your-own-api-key
FOXCLOUD_DEVICE_SN=optional-device-serial-number
```

### 本地 Modbus 模式

直接通过局域网读取逆变器 / datalogger 的 Modbus TCP 数据。优点是不需要 FoxCloud API key，数据更实时，也不依赖互联网。

```dotenv
DATA_PROVIDER=modbus
MODBUS_HOST=your-inverter-lan-ip
MODBUS_PORT=502
MODBUS_UNIT_ID=1
MODBUS_SAMPLE_INTERVAL_MS=60000
MODBUS_READ_ONLY=true
```

使用前可以先测试连接：

```bash
nc -zv your-inverter-lan-ip 502
```

如果显示连接成功，仪表盘就可以尝试读取本地 Modbus 数据。

## 本地安装步骤

1. 安装 Node.js 20 或更新版本。
2. 下载或 clone 本项目。
3. 在项目目录运行：

```bash
npm install
```

4. 创建本地 `.env`：

```bash
cp .env.example .env
```

也可以使用交互式设置：

```bash
npm run setup
```

5. 编辑 `.env`，填入你自己的配置。

6. 构建并启动：

```bash
npm run build
npm start
```

7. 打开：

```text
http://localhost:3000
```

浏览器会弹出登录窗口，请输入 `.env` 中的 `DASHBOARD_USERNAME` 和 `DASHBOARD_PASSWORD`。

不要使用 `http://username:password@localhost:3000` 这种带密码的 URL 打开网页。有些浏览器会阻止这种页面继续发起 `fetch` 请求。

## 常用环境变量

```dotenv
PORT=3000
HOST=0.0.0.0
DASHBOARD_TIME_ZONE=Australia/Sydney
DATA_PROVIDER=foxcloud
FOXCLOUD_BASE_URL=https://www.foxesscloud.com
FOXCLOUD_DEMO_MODE=false
FOXCLOUD_API_KEY=your-own-api-key
FOXCLOUD_DEVICE_SN=
FOXCLOUD_TIMEOUT_MS=15000
DASHBOARD_USERNAME=your-dashboard-login-name
DASHBOARD_PASSWORD=your-dashboard-password
DASHBOARD_USERS=
```

Modbus 模式常用变量：

```dotenv
DATA_PROVIDER=modbus
MODBUS_HOST=replace-with-your-inverter-lan-ip
MODBUS_PORT=502
MODBUS_UNIT_ID=1
MODBUS_PROFILE=foxess-h3-smart
MODBUS_INVERTER_MODEL=FoxESS H3 Smart
MODBUS_READ_ONLY=true
```

`MODBUS_PROFILE` 用来选择寄存器表；`MODBUS_INVERTER_MODEL` 只是网页上显示的型号名称。

增加测试用户示例：

```dotenv
DASHBOARD_USERS=Foxtester=strong-test-password
```

多个用户用逗号分隔：

```dotenv
DASHBOARD_USERS=Friend1=strong-password-1,Friend2=strong-password-2
```

请避免在密码里使用逗号，因为逗号用于分隔多个用户。

## 开发模式

```bash
npm run dev
```

如果修改了 `.env`，需要先用 `Ctrl+C` 停止，再重新运行 `npm run dev`。开发模式不会自动重新加载环境变量。

## 数据存储

每日能源数据会存储在本地 SQLite：

```text
data/foxcloud-dashboard.sqlite
```

这个文件是你自己的私有数据，已经被 `.gitignore` 排除，不应该提交到 GitHub。

如果启用备份，备份文件会写入：

```text
data/backups/
```

## 健康检查

公开的轻量探活接口：

```text
/api/livez
```

它只返回 `ok` 和时间戳。更完整的 `/api/health` 仍然需要仪表盘登录，并会显示版本号、可选 git SHA、启动时间和运行时长。它也会显示 SQLite 备份配置、调度器状态、下次预计运行时间和最近一次运行状态，方便 Docker 或 NAS 部署排查。使用 Modbus 模式时，它还会显示当前配置的 profile、实际生效的 profile，以及可用的 Modbus profile id 列表。

## Docker / Synology 简要说明

Synology 推荐使用 Container Manager / Docker 部署。项目目录中已有：

- `Dockerfile`
- `docker-compose.example.yml`
- `docker-compose.synology.yml`

部署时请确保：

- `.env` 放在 NAS 项目目录中。
- `data/` 保持持久化，不要在 rebuild 时删除。
- 不要把 `.env` 和 SQLite 数据库提交到 GitHub。
- 如果想让 `/api/health` 显示具体部署版本，可以在 Docker build 前设置 `APP_VERSION` 和 `GIT_SHA`。

可以用下面命令自动更新 `.env` 里的非敏感版本信息：

```bash
npm run metadata
```

## 重算缓存

网页里的“重算缓存”按钮会先预估本次最多重算多少天，以及大约会调用多少次 FoxCloud history API。FoxCloud 模式会限制为最近一批日期，避免一次性调用太多 API；Modbus 模式只会使用本地 SQLite/Modbus 数据，不会调用 FoxCloud。

## Modbus profile

目前内置的 Modbus profile 是 `foxess-h3-smart`。如果 `.env` 里的 `MODBUS_PROFILE` 拼错，系统会先自动 fallback 到 `foxess-h3-smart`，避免服务直接启动失败；同时 `/api/health` 会显示 `modbusProfileMatched:false`，网页也会显示 warning，提醒用户检查寄存器表是否正确。

## 天气预报

v2 改版分支可以显示本地天气和简单的太阳能发电天气判断。天气由后端从 Open-Meteo 获取，浏览器不需要 API key。

现在可以直接在网页里的“天气位置 / 预报位置设置”面板中修改邮编、国家、显示地名或经纬度。保存后的设置会写入 SQLite，并优先生效。

`.env` 里的这些值是新安装或数据库为空时的默认值，可以填邮编，也可以填更精确的经纬度：

```bash
WEATHER_ENABLED=true
WEATHER_PROVIDER=open-meteo
WEATHER_POSTCODE=2141
WEATHER_COUNTRY_CODE=AU
WEATHER_LOCATION_NAME=Lidcombe

# 可选：比邮编更精确
WEATHER_LATITUDE=
WEATHER_LONGITUDE=
WEATHER_TIMEZONE=Australia/Sydney
```

如果填了 `WEATHER_LATITUDE` 和 `WEATHER_LONGITUDE`，系统会优先使用经纬度；否则会先用 Open-Meteo geocoding 解析 `WEATHER_POSTCODE`，再 fallback 到 Zippopotam.us 做邮编到大概位置的查询。邮编模式是近似位置；如果你想更精确，请使用经纬度。

`WEATHER_LOCATION_NAME` 只改变网页显示的地名，例如显示 Lidcombe；不会改变天气预报使用的经纬度。

登录后也可以打开 `/api/weather-settings` 查看当前生效的天气位置设置。

## 预估节省电费

网页会根据太阳能和电池减少的电网取电量，估算节省了多少电费。现在可以直接在网页里的
“电价设置 / 节省金额设置”面板中修改峰谷电价和回馈电价。保存后的设置会写入 SQLite，
只要保留 `data` 文件夹，Docker / Synology delete 和 recreate 后也不会丢。

`.env` 里的这些值是新安装或数据库为空时的默认值：

```bash
ELECTRICITY_CURRENCY=AUD
ELECTRICITY_PEAK_START=15:00
ELECTRICITY_PEAK_END=20:59
ELECTRICITY_PEAK_RATE=0.30
ELECTRICITY_OFF_PEAK_RATE=0.24
ELECTRICITY_FEED_IN_RATE=0
```

登录后也可以打开 `/api/tariff` 查看当前生效的电价设置。

目前算法使用每日总量估算：`家庭用电 - 电网取电` 视为被太阳能/电池覆盖的用电量。因为每日表没有每一分钟的峰谷明细，所以周期统计会使用峰谷加权平均电价。这个数字适合作为参考，不等同于正式电费账单。

## 常用命令

```bash
npm run check
npm test
npm run build
npm start
```

## 已知维护原则

- 不要大规模重写整个项目。
- 每次只做小的、可回滚的修复。
- 保留现有功能。
- 先本地 HTTP 测试，再同步 NAS。
- 安全响应头 / CSP / Helmet 需要单独测试，不能直接加入主流程。

## 反馈问题时请提供

- 操作系统：macOS、Windows、Linux 或 Synology。
- 使用 FoxCloud 还是 Modbus。
- 浏览器名称。
- 错误截图，注意遮住 API key、密码和完整序列号。
- 终端或容器日志，注意删除敏感信息。
