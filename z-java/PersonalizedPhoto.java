public class PersonalizedPhoto {
    private String profileID; // Reference to Profile ID
    private String imageID; // Reference to Image ID
    private String emotionID; // Reference to Emotion ID
    private String id;

    public PersonalizedPhoto(String profileID, String imageID, String emotionID) {
        this.profileID = profileID;
        this.imageID = imageID;
        this.emotionID = emotionID;
    }

    // Getters and Setters
    public String getProfileID() {
        return profileID;
    }

    public void setProfileID(String profileID) {
        this.profileID = profileID;
    }

    public String getImageID() {
        return imageID;
    }

    public void setImageID(String imageID) {
        this.imageID = imageID;
    }

    public String getEmotionID() {
        return emotionID;
    }

    public void setEmotionID(String emotionID) {
        this.emotionID = emotionID;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Equivalent toJSON method
    public String toJSON() {
        return "{\"profileID\": \"" + profileID + "\", \"imageID\": \"" + imageID + 
               "\", \"emotionID\": \"" + emotionID + "\", \"id\": \"" + id + "\"}";
    }
}
