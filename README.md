```mermaid

erDiagram
    User ||--o{ POST : userid
    User {
        string name
        string custNumber
        string sector
    }
    POST {
        uuid postid PK
        string title
        string body
        uuid userid PK
    }
```