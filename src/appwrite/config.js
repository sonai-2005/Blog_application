import { data } from "react-router-dom";
import conf from "../config/config";
import { Client,  ID , Databases,Storage,Query } from "appwrite";
import { createLogger, splitVendorChunk } from "vite";

export class Service{
    client = new Client;
    databases;
    bucket;
    constructor(){
         this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.databases = new Databases(this.client)
            this.bucket = new Storage(this.client)
    }
    async createPost({title , slug , content , featureImage, status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId,
                }

            )
        } catch (error) {
            console.log("create post::error ! "+ error)
        }
    }
    async updatePost(slug , {title , content,featureImage,status}){
        try {
          return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featureImage,
                status,
            }
          )  
        } catch (error) {
             console.log("update post::error ! "+ error)
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("delete post has error" + error);
            return false;
        }
    }
    async getPost(){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("error in loading the database:: " + error);
            return false;
        }
    }
    async getposts(queries=[Query.equal("status" , "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("error in the getposts");
            return false;
        }
    }



    //file upload services....
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("error uploading file :: "+error);
            
        }
    }

    //deleting the file
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId  
            )
            return true
            
        } catch (error) {
            console.log("error deleting file");
            return false;
            
        }
    }
    getPreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
    }
}
const service = new Service();
export default service;