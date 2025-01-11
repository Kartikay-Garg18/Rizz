## **Project Name: Rizz**

---

### **Overview:**
**Rizz** is a real-time chat application built using the MERN stack. It provides seamless real-time messaging, user authentication, profile updates, and a responsive design. Features include online/offline status, cloud-based media storage, and chat persistence, making it a robust platform for communication.

---

### **Mission and Objectives**

#### **Mission:**
To develop a scalable, user-friendly, and interactive real-time chat application with advanced features for seamless communication.

#### **Objectives:**
1. Implement secure user authentication and profile management.
2. Provide real-time messaging using **Socket.IO**.
3. Enable profile customization with support for profile picture updates.
4. Design a fully responsive UI for various devices.
5. Use cloud storage for managing user media and persistent chat data.
6. Deploy the application for global accessibility.

---

### **Technology Stack**

#### **Frontend**
1. **React.js**
   - **Why:** Facilitates dynamic UI rendering and interactive interfaces.
   - **Use Case:** Builds the chat interface, user profile pages, and message feed.

2. **Tailwind CSS**
   - **Why:** Simplifies styling with utility-first classes.
   - **Use Case:** Creates a responsive, modern design for both desktop and mobile.

#### **Backend**
1. **Node.js**
   - **Why:** Enables scalable server-side execution.
   - **Use Case:** Handles API requests, real-time connections, and user management.

2. **Express.js**
   - **Why:** Simplifies routing and middleware handling.
   - **Use Case:** Manages APIs for user authentication and messaging.

3. **Socket.IO**
   - **Why:** Powers real-time, bi-directional communication.
   - **Use Case:** Handles real-time messaging and online/offline status.

#### **Database**
1. **MongoDB**
   - **Why:** A NoSQL database ideal for dynamic and scalable data storage.
   - **Use Case:** Stores user data, messages, and session details.

2. **Mongoose**
   - **Why:** Simplifies MongoDB interactions with schema-based models.
   - **Use Case:** Manages structured data relationships for the app.

#### **Authentication**
1. **JWT (JSON Web Tokens)**
   - **Why:** Provides secure token-based authentication.
   - **Use Case:** Authenticates and authorizes user access.

2. **Bcrypt.js**
   - **Why:** Hashes sensitive information like passwords.
   - **Use Case:** Secures user credentials.

#### **Deployment**
1. **AWS**
   - **Why:** For scalable application hosting.
   - **Use Case:** Deploys the app and database.

2. **Cloudinary**
   - **Why:** Offers cloud-based storage for media files.
   - **Use Case:** Stores profile pictures and other user-uploaded files.

---

## **Workflow Overview**
This section illustrates the complete workflow for users and admins in the **Rizz** application, covering all major functionalities such as real-time messaging, user authentication, profile updates, and chat persistence.

---

### **Flowchart**
This section provides a visual representation of the overall flow of the **Rizz** application, including user registration, login, real-time messaging, profile updates, and managing chat persistence.
![diagram-export-12-12-2024-10_22_23-AM](https://github.com/user-attachments/assets/835194ab-c1bd-4788-a59b-395ece914e5e)


---

### **System Architecture**
This section demonstrates the high-level architecture of the **Rizz** app, showcasing the interaction between the frontend, backend, database, and external services like Cloudinary for media storage and Socket.IO for real-time messaging.
![diagram-export-12-12-2024-11_47_57-AM](https://github.com/user-attachments/assets/f83ee835-69c9-4c57-b28d-8992d714a7f6)


---

### **Sequence Diagram**
This section presents the sequence of interactions between the different components of the **Rizz** application, including users, the backend system, real-time chat handling, and cloud-based media storage.
![diagram-export-12-12-2024-10_26_46-AM](https://github.com/user-attachments/assets/f46125ee-8699-4f59-bafa-c4e2a384e6d4)


---

### **Database Design**
This section presents the database schema, highlighting the following:
- The structure of **Users**, **Messages**, and **Chats** collections.
- Relationships between collections (e.g., **userID** in Messages links to the Users collection, **chatID** links to the Chats collection).
![diagram-export-12-12-2024-10_26_11-AM](https://github.com/user-attachments/assets/a37c5676-1cea-46ac-9728-7aa5e506c6d7)


---