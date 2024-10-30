import java.util.Date;

public class GameSession {
    private String userId; // Reference to User ID
    private int duration; // Duration of the session
    private Date date; // Date of the session
    private String id;

    public GameSession(String userId, int duration, Date date) {
        this.userId = userId;
        this.duration = duration;
        this.date = date;
    }

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Equivalent toJSON method
    public String toJSON() {
        return "{\"userId\": \"" + userId + "\", \"duration\": " + duration + 
               ", \"date\": \"" + date + "\", \"id\": \"" + id + "\"}";
    }
}
