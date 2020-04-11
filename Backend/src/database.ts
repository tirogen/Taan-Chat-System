import * as dotenv from "dotenv";
import * as mysql from "mysql";
import { UnreadMessage } from "./type";
import moment from 'moment';

dotenv.config();

const connection: mysql.Connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

const getUnreadMessage = (room_name: string, timestamp: string): Promise<UnreadMessage[]> => {
  let tTime: string = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
  return new Promise<UnreadMessage[]>((resolve, reject) => {
    connection.query('SELECT rooms.name as room, message, users.name as client, created_at as timestamp FROM messages JOIN users ON users.id=messages.user_id JOIN rooms ON rooms.id=messages.room_id WHERE room_id=(SELECT id FROM rooms WHERE name=?) AND created_at > ? ORDER BY created_at ASC', [room_name, tTime], (err: mysql.MysqlError | null, result) => {
        if(err) reject([]);
        resolve(result);
    });
  })
}

const addUser = (name: string): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    connection.query('INSERT INTO users (name) SELECT ? WHERE NOT EXISTS (SELECT * FROM users WHERE name=?)', [name, name], (err: mysql.MysqlError | null) => {
      if(err) reject(false);
      resolve(true);
    });
  })
}

const addRoom = (name: string): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    connection.query('INSERT INTO rooms (name) SELECT ? WHERE NOT EXISTS (SELECT * FROM rooms WHERE name=?)', [name, name], (err: mysql.MysqlError | null) => {
      if(err) reject(false);
      resolve(true);
    });
  })
}

const addMessage = (message: string, user_name: string, room_name: string, timestamp: string): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    connection.query('INSERT INTO messages SET message=?, user_id=(SELECT id FROM users WHERE name=?), room_id=(SELECT id FROM rooms WHERE name=?), created_at=?', [message, user_name, room_name, timestamp], (err: mysql.MysqlError | null) => {
      if(err) reject(false);
      resolve(true);
    });
  })
}

const getYourRoom = (user_name: string): Promise<string[]> => {
  return new Promise<string[]>((resolve, reject) => {
    connection.query('SELECT rooms.name FROM rooms JOIN room_user ON room_user.room_id=rooms.id JOIN users ON room_user.user_id=users.id WHERE users.name=?', [user_name], (err: mysql.MysqlError | null, result) => {
      if(err) reject([]);
      resolve(result);
    });
  })
}

const joinRoom = (user_name: string, room_name: string): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    connection.query('INSERT INTO room_user SET user_id=(SELECT id FROM users WHERE name=?), room_id=(SELECT id FROM rooms WHERE name=?)', [user_name, room_name], (err: mysql.MysqlError | null) => {
      if(err) reject(false);
      resolve(true);
    });
  })
}

const leaveRoom = (user_name: string, room_name: string): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    connection.query('DELETE FROM room_user WHERE user_id=(SELECT id FROM users WHERE name=?) AND room_id=(SELECT id FROM rooms WHERE name=?)', [user_name, room_name], (err: mysql.MysqlError | null) => {
      if(err) reject(false);
      resolve(true);
    });
  })
}

export { getUnreadMessage, addUser, addRoom, addMessage, getYourRoom, joinRoom, leaveRoom };
