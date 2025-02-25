import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const categoryService ={
    async getAll(){
        return prisma.categories.findMany({include:{products:true}});
    },

    async getByid(id:number){
        return prisma.categories.findUnique({where:{CategoryId: id} , include:{products:true}})
    },

    async create(data:any){
        return prisma.categories.create({data})
    },

    async update(id:number , data:any){
        return prisma.categories.update({where:{CategoryId:id} , data});
    },

    async delete(id:number){
        return prisma.categories.delete({where:{CategoryId:id}});
    },
}