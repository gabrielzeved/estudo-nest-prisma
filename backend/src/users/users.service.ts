import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    users : User[] = []

    all() : User[]{
        return this.users;
    }

    one(id: string) : User{
        return this.users.find((user) => user.id === id);
    }

    new(user: User){
        if(!this.exists(user.id)){
            this.users.push(user);
            return user;
        }

        return null;
    }

    exists(id: string){
        return this.users.some((user) => user.id === id);
    }

}
