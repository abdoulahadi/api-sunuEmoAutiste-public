public class Image {
    private String imagePath;
    private String emotionID; // Reference to Emotion ID
    private String niveau;
    private String id;

    public Image(String imagePath, String emotionID, String niveau) {
        this.imagePath = imagePath;
        this.emotionID = emotionID;
        this.niveau = niveau;
    }

    // Getters and Setters
    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getEmotionID() {
        return emotionID;
    }

    public void setEmotionID(String emotionID) {
        this.emotionID = emotionID;
    }

    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Equivalent toJSON method
    public String toJSON() {
        return "{\"imagePath\": \"" + imagePath + "\", \"emotionID\": \"" + emotionID + 
               "\", \"niveau\": \"" + niveau + "\", \"id\": \"" + id + "\"}";
    }
}
