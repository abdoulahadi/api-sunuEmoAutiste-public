public class Emotion {
    private String emotionName;
    private String id;

    public Emotion(String emotionName) {
        this.emotionName = emotionName;
    }

    // Getters and Setters
    public String getEmotionName() {
        return emotionName;
    }

    public void setEmotionName(String emotionName) {
        this.emotionName = emotionName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Equivalent toJSON method
    public String toJSON() {
        return "{\"emotionName\": \"" + emotionName + "\", \"id\": \"" + id + "\"}";
    }
}
