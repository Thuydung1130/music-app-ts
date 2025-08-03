interface objectPagination {
    currentPage: number,
    limitItem: number,
    skip?: number,
    totalPage?: number
}
const paginationHelper=(objectPagination:objectPagination,query:Record<string,any>,countRecords:number):objectPagination=>{
    if(query.page){
        objectPagination.currentPage=parseInt(query.page);
    }
    if(query.limit){
        objectPagination.limitItem=parseInt(query.limit);
    }
    objectPagination.skip=(objectPagination.currentPage-1)*objectPagination.limitItem;

    
    const totalPage=Math.ceil(countRecords/objectPagination.limitItem);
    objectPagination.totalPage=totalPage;
    return objectPagination;
}
export default paginationHelper