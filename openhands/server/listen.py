import socketio
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

from openhands.server.listen_socket import sio
from openhands.server.middleware import (
    AttachConversationMiddleware,
    CacheControlMiddleware,
    GitHubTokenMiddleware,
    InMemoryRateLimiter,
    LocalhostCORSMiddleware,
    RateLimitMiddleware,
)
from openhands.server.static import SPAStaticFiles

# Создаём базовое FastAPI-приложение
base_app = FastAPI()

# Подключаем статические файлы к пути /static, а не к корню
base_app.mount(
    '/static', SPAStaticFiles(directory='./frontend/build', html=True), name='dist'
)

# Добавляем middleware
base_app.add_middleware(
    LocalhostCORSMiddleware,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

base_app.add_middleware(CacheControlMiddleware)
base_app.add_middleware(
    RateLimitMiddleware,
    rate_limiter=InMemoryRateLimiter(requests=10, seconds=1),
)
base_app.middleware('http')(AttachConversationMiddleware(base_app))
base_app.middleware('http')(GitHubTokenMiddleware(base_app))

# Добавляем маршрут для корневой страницы
@base_app.get("/")
async def serve_spa():
    with open("./frontend/build/index.html", "r") as f:
        return HTMLResponse(content=f.read())

# Создаём Socket.IO ASGI-приложение, оборачивая base_app
app = socketio.ASGIApp(sio, other_asgi_app=base_app)