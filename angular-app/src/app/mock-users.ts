export class User {
  userId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  constructor(
    userId: string,
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    this.password = password;
  }
}

const USERS: User[] = [];
// populate the USERS list with mock users
USERS.push(
  new User(
    'admin',
    'Josh',
    'Taylor',
    'JoshuaTaylor@admin.com',
    'as;lknv8989.>op{'
  )
);

USERS.push(
  new User(
    'testUser1',
    'Robbie',
    'Lawlor',
    'TestUser1@gmail.com',
    'testUser1Pass'
  )
);

USERS.push(
  new User('testUser2', 'Jon', 'Jones', 'TestUser2@gmail.com', 'testUser2Pass')
);

USERS.push(
  new User('testUser3', 'Joe', 'Lauzon', 'TestUser3@gmail.com', 'testUser3Pass')
);

export function getUser(userName: string): User | null {
  for (const user of USERS) {
    if (user.userId === userName) {
      return user;
    }
  }
  return null;
}

export { USERS };
