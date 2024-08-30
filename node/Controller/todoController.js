import db from "../db.js";


export const createNewTodo = (req, res) => {
    const { title, description, status, created_at, updated_at } = req.body;
    const sql = "INSERT INTO todo (title, description, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";
    const values = [title, description, status, created_at, updated_at];  
    
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.status(200).send({ message: "Todo added successfully" });
        }
    });
};

// Get all todos
export const getTodos = (req, res) => {
    const sql = "SELECT * FROM todos";
    
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.status(200).send(results);
        }
    });
};

// Update a todo
export const updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description, status, updated_at } = req.body;
    const sql = "UPDATE todos SET title = ?, description = ?, status = ?, updated_at = ? WHERE id = ?";
    const values = [title, description, status, updated_at, id];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.status(200).send({ message: "Todo updated successfully" });
        }
    });
};

export const updateStatus =(req,res)=>{
    const {id} = req.params;
    const sql = "update todo set status=? where id =?";
    const values =[1, id];
    db.query(sql,values,(err,data)=>{
        if (err){
            res.status(400).send (err);

        }else{
            res.status(200).send ({ message: "todo updated"})
 }
});

};

// Delete a todo
export const deleteTodo = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM todos WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.status(200).send({ message: "Todo deleted successfully" });
        }
    });
};
