```mermaid

erDiagram
    User ||--o{ Post : userid
    User {
        string name
        string interests
        string userid
    }
    Post {
        uuid postid PK
        string title
        string sort
        uuid userid PK
    }
```