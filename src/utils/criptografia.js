import { hashSync, compareSync } from 'bcrypt';
import bcrypt from 'bcrypt';

export function hashear(password) {
    return hashSync(password, bcrypt.genSaltSync(10));
}

export function chequearPassword(aChequear, passHasheado) {
    return compareSync(aChequear, passHasheado);
}

