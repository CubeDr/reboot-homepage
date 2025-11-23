export enum Role {
  ADMIN,
  MANAGER,
  MEMBER,
  NONE,
  BANNED,
}

export function toRoleString(role: Role): string {
  return Role[role].toLowerCase();
}

export function toRoleFromString(role: string): Role {
  switch (role) {
    case 'manager':
      return Role.MANAGER;
    case 'admin':
      return Role.ADMIN;
    case 'member':
      return Role.MEMBER;
    default:
      return Role.NONE;
    case 'banned':
      return Role.BANNED;
  }
}

export interface UserData {
  uid: string;

  name: string;
  role: Role;

  gender: string;
  birthday: string;

  email: string;
  phone: string;
}
