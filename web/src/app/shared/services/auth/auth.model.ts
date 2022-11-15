/**
 * A base class for login response.
 *
 * @category Model
 */
export class LoginResponse {
    /**
     * The constructor of the `LoginResponse` class.
     *
     * @param accessToken generated access token
     * @param refreshToken generated refresh token
     * @param user user's information
     */
    constructor(
        public accessToken: string,
        public refreshToken: string,
        public user: LoginUser
    ) {}
}

/**
 * A base class for login user.
 *
 * @category Model
 */
export class LoginUser {
    /**
     * The constructor of the `LoginUser` class.
     *
     * @param firstName user's first name
     * @param lastName user's last name
     * @param pk user's ID
     * @param username user's username
     * @param email user's email
     */
    constructor(
        public firstName: string,
        public lastName: string,
        public pk: number,
        public username: string,
        public email: string
    ) {}
}

/**
 * A base class for detail response.
 *
 * @category Model
 */
export class DetailResponse {
    /**
     * The constructor of the `DetailResponse` class.
     *
     * @param detail detail message
     */
    constructor(
        public detail: string
    ) {}
}