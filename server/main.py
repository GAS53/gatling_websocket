import json

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Response
from websockets.exceptions import ConnectionClosed
import uvicorn

from utils import Controller
from schemas import Base

app = FastAPI()

UC = Controller()


@app.post('/set_user')
async def set_user(data: Base):
    data = data.model_dump()
    status, message = UC.set_user(data)
    if status:
        Response(content=f"new user is add {data.get('first_name')}", status_code=201)
    else:
        Response(content=f"wrong add user - {message}", status_code=400)



@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            data = json.loads(data)
            command = data.get('command')
            result = {'msg': f'wrong command {command}'}
            if command == 'set_user':
                status, message = UC.set_user(data)
                if status:
                    result['msg'] = f"new user is add {data.get('first_name')}"
                else:
                    result['msg'] = f"wrong add user - {message}"
            elif command == 'get_user_by_name':
                user = UC.get_user_by_name(data.get('first_name'))
                if user:
                    result['msg'] = user.__str__()
                else:
                    result['msg'] = f'wrong name {data.get('first_name')}'
            elif command == 'get_all_users':
                result['msg'] = UC.get_all_users()
            elif command == 'get_all_commands':
                result['msg'] = 'set_user, get_user_by_name, get_all_users, get_all_commands, del_user_by_name'
            elif command == 'del_user_by_name':
                del_result = UC.del_user_by_name(data.get("first_name"))
                if del_result:
                    result['msg'] = 'del user ddeed is ok!'
                else:
                    result['msg'] = 'user alredy not exists'
            await websocket.send_text(json.dumps(result))
            print(result)
    except (WebSocketDisconnect, ConnectionClosed):
        ...


# if __name__ == "__main__":
#     uvicorn.run("main:app", workers=1)  # , host='0.0.0.0', port=8080


       