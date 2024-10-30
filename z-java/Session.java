import java.util.Date;

public class Session {
    private String profileID; // Reference to Profile ID
    private Date startTime;
    private Date endTime;
    private String id;

    public Session(String profileID, Date startTime, Date endTime) {
        this.profileID = profileID;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // Getters and Setters
    public String getProfileID() {
        return profileID;
    }

    public void setProfileID(String profileID) {
        this.profileID = profileID;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Equivalent toJSON method
    public String toJSON() {
        return "{\"profileID\": \"" + profileID + "\", \"startTime\": \"" + startTime + 
               "\", \"endTime\": \"" + endTime + "\", \"id\": \"" + id + "\"}";
    }
}
