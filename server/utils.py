

class User:
    def __init__(self) -> None:
        self.first_name = None
        self.age = None
        self.age = None

    def set_user(self, id, data):
        age = data.get('age')
        first_name = data.get('first_name')
        if not(age and isinstance(age, int)):
            return False, 'wrong age'
        elif not(first_name and isinstance(first_name, str) and len(first_name)>3):
            return False, 'wrong first_name'
        self.first_name, self.age, self.id = first_name, age, id
        return True, 'ok'
    
    def __str__(self) -> str:
        return f'first_name {self.first_name} age {self.age}'


class Controller():
    def __init__(self):
        self.all_users = {}
        self.id = 1

    def register_info(self):
        return {"first_name": "string", "age": "int"}
    
    def set_user(self, data):
        user = User()
        user_exists = self.get_user_by_name(data.get("first_name"))
        if user_exists:
            return False, "user alredy exists"
        set_user_result = user.set_user(self.id, data)
        if set_user_result[0]:
            self.all_users[user.first_name] = user
            self.id += 1
        return set_user_result

    def get_user_by_name(self, name):
        return self.all_users.get(name)
    
    def get_all_users(self):
        return len(self.all_users.keys())

    def del_user_by_name(self, name):
        if self.all_users.get(name):
            del self.all_users[name]
            return True
        return False
