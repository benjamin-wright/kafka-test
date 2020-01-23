```mermaid
graph LR
    subgraph streaming infastructure
        Producer --> Kafka;
        Kafka --> EMR;
        EMR --> Kafka;
        Kafka --> Consumer;
    end

    subgraph Metrics
        Consumer --> Redis;
        Metrics-Api --> Redis;
        Color-Viewer --> Metrics-Api;
    end
```