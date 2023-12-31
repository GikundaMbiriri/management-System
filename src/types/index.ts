export interface Program{
   _id:string,
   title:string,
   description:string,
   schoolId:{
    _id:string,
    name:string,
    country:string,
    city:string,
    street:string,
    about:string,
    programmeIds:[],
    status:boolean,
    createdAt:Date,
    updatedAt:Date,
    features:string[],
    images:string[],
    nationalities:string,
    numberOfStudents:string
   },
   status:boolean,
   createdAt:Date,
   updatedAt:Date,
   applicationFees:number,
   tuitionFees:number,
   intakes:string[],
   level:string,
   count:number

}

export interface User{
   role:string,
   emailVerified:boolean,
   phoneVerified:boolean,
   _id:string,
   firstName:string,
   lastName:string,
   approvalStatus:string,
   onboarding:boolean,
   recruitmentDetails?:{
      studentsFrom:string[],
      studentsTo:string[],
   },
business?:{
   location:{},
   socials:{}
}

}
export interface Search{
   query:string
}