import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

export class Authservice {
    client = new Client();
    account;//account is a varible name ,,, real account value A is capital but this is lowercase
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                //call another method
                return this.login({ email, password });

            }
            else {
                return userAccount;
            }
        }
        catch (error) {
            throw error;
        }

    }
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);

        } catch (error) {
            throw error;
        }
    }
    //to get the current user...
     async getCurrent() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("log out problem" + error);
        }
    }
}
const authservice = new Authservice();

export default Authservice;