```mermaid

erDiagram
    User ||--o{ POST : userid
    User {
        string name
        string interests
        string userid
    }
    User ||--o{ SUGGESTED : interests
    SUGGESTED {
        string title
        string interests PK
        uuid postid
    }
    POST {
        uuid postid PK
        string title
        string sort
        uuid userid PK
    }
```