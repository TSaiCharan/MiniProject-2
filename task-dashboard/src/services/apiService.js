const BASE_URL = "http://localhost:8080/api/tasks";

const apiService = {

    getAllTasks: async()=> {
        try{
            const res = (await fetch(`${BASE_URL}`));
            const jsonData = await res.json();
            console.log(jsonData)
            return jsonData;
        }
        catch(err){
            console.log(err);
        }
    }

}


export default apiService;
