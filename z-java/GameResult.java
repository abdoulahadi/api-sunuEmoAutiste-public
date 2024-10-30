public class GameResult {
    private String profileId; // Reference to Profile ID
    private String gameId; // Reference to Game ID
    private int goodAnswer; // Number of correct answers
    private int badAnswer; // Number of incorrect answers
    private int tempsMis; // Time spent
    private int score; // Score
    private String id;

    public GameResult(String profileId, String gameId, int goodAnswer, int badAnswer, int tempsMis, int score) {
        this.profileId = profileId;
        this.gameId = gameId;
        this.goodAnswer = goodAnswer;
        this.badAnswer = badAnswer;
        this.tempsMis = tempsMis;
        this.score = score;
    }

    // Getters and Setters
    public String getProfileId() {
        return profileId;
    }

    public void setProfileId(String profileId) {
        this.profileId = profileId;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public int getGoodAnswer() {
        return goodAnswer;
    }

    public void setGoodAnswer(int goodAnswer) {
        this.goodAnswer = goodAnswer;
    }

    public int getBadAnswer() {
        return badAnswer;
    }

    public void setBadAnswer(int badAnswer) {
        this.badAnswer = badAnswer;
    }

    public int getTempsMis() {
        return tempsMis;
    }

    public void setTempsMis(int tempsMis) {
        this.tempsMis = tempsMis;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Equivalent toJSON method
    public String toJSON() {
        return "{\"profileId\": \"" + profileId + "\", \"gameId\": \"" + gameId + 
               "\", \"goodAnswer\": " + goodAnswer + ", \"badAnswer\": " + badAnswer + 
               ", \"tempsMis\": " + tempsMis + ", \"score\": " + score + 
               ", \"id\": \"" + id + "\"}";
    }
}
