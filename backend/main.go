package main

import (
	"encoding/json"
	"net/http"
)

type ToDo struct {
	Title string `json:"title"`
	Description string `json:"description"`
}

var toDoList = []ToDo{} 

func main() {
	// Your code here
	http.HandleFunc("/", ToDoListHandler)
	http.ListenAndServe(":8080", nil)
}

func ToDoListHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Your code here
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS") // CORS 
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type") // CORS

	switch r.Method {
		case "OPTIONS": // CORS preflight request 
			w.WriteHeader(http.StatusOK) // response 200
		case "GET": // Sends back the list of ToDos
			w.Header().Set("Content-Type", "application/json")
			err := json.NewEncoder(w).Encode(toDoList)
			if err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest) // response 400
				return
			}
			w.WriteHeader(http.StatusOK) // response 200
		case "POST": // Adds a new ToDo to the list
			var toDo ToDo

			err := json.NewDecoder(r.Body).Decode(&toDo)
			if err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest) // response 400
				return
			}
			toDoList = append(toDoList, toDo)
			w.WriteHeader(http.StatusOK) // response 200 
		default:
			http.Error(w, "Method not allowed", http.StatusInternalServerError) // response 500
	}
}
