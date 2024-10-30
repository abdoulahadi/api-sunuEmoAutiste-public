public class Game {
    private String name;
    private String type; // "Jeu2D" or "Jeu3D"
    private String description;
    private String id;

    public Game(String name, String type, String description) {
        this.name = name;
        this.type = type;
        this.description = description;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Equivalent toJSON method
    public String toJSON() {
        return "{\"name\": \"" + name + "\", \"type\": \"" + type + 
               "\", \"description\": \"" + description + "\", \"id\": \"" + id + "\"}";
    }
}
