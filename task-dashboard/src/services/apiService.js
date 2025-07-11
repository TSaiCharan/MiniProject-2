const BASE_URL = "http://localhost:8080/api/tasks";

const apiService = {
    getAllTasks: async () => {
        try {
            const res = await fetch(`${BASE_URL}`);
            const jsonData = await res.json();

            return apiService.convertTagsToArray(jsonData);
        } catch (err) {
            console.log(err);
        }
    },

    updateTaskStatus: async (id, newStatus) => {
        const res = await fetch(`${BASE_URL}/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskStatus: newStatus }),
        });

        if (!res.ok) {
            console.error('Failed to update status');
        } else {
            console.log('Status updated successfully');
        }
    },

    getSearchResult: async (searchString) => {
        try {
            const res = await fetch(`${BASE_URL}/search/${searchString}`);
            const jsonData = await res.json();

            return apiService.convertTagsToArray(jsonData);
        } catch (err) {
            console.log(err);
        }
    },

    postNewTask: async (task) => {
        try {
            const res = await fetch(`${BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });
            return true;
        } catch (err) {
            console.log(err);
        }
    },

    putTask: async (id, task) => {
        try{
            const res = await fetch(`${BASE_URL}/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task),
            });
            return true;
        }
        catch(err){
            console.log(err);
        }
    },

    convertTagsToArray: (tasks) => {
        return tasks.map(task => {
            if (task.tags && typeof task.tags === "string") {
                return {
                    ...task,
                    tags: task.tags.split(",").map(tag => tag.trim())
                };
            }
            return task;
        });
    }
};

export default apiService;
