import java.util.Date;

public class Profile {
    private String user; // Reference to User ID
    private String name;
    private int age;
    private String defaultCharacter;
    private Date lastModified;
    private String id;

    public Profile(String user, String name, int age, String defaultCharacter) {
        this.user = user;
        this.name = name;
        this.age = age;
        this.defaultCharacter = defaultCharacter;
        this.lastModified = new Date(); // Set to current date by default
    }

    // Getters and Setters
    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getDefaultCharacter() {
        return defaultCharacter;
    }

    public void setDefaultCharacter(String defaultCharacter) {
        this.defaultCharacter = defaultCharacter;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Equivalent toJSON method
    public String toJSON() {
        return "{\"user\": \"" + user + "\", \"name\": \"" + name + "\", \"age\": " + age + 
               ", \"defaultCharacter\": \"" + defaultCharacter + "\", \"lastModified\": \"" + lastModified + "\", \"id\": \"" + id + "\"}";
    }
}
