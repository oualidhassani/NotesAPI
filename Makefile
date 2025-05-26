BACKEND_DIR=/Users/nassirinassiri/Documents/workspace-spring-tool-suite-4-4.28.0.RELEASE/notesapis
FRONTEND_DIR=/Users/nassirinassiri/Documents/workspace-spring-tool-suite-4-4.28.0.RELEASE/notesapis/notes-frontend

run:
	@echo "Starting backend and frontend..."
	concurrently "make run-backend" "make run-frontend"

run-backend:	
	@echo "Starting backend..."
	cd $(BACKEND_DIR) && ./mvnw spring-boot:run

run-frontend:
	@echo "Starting frontend..."
	cd $(FRONTEND_DIR) && npm run dev