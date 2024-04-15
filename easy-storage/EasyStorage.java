package de.entwicklerheld.easystorage.challenge.stage1;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class EasyStorage{

    private Map<String, String> storage = new HashMap<String, String>();
    public void store(String item, String repository){
        if (item.isEmpty() || repository.isEmpty()) {
            throw new IllegalArgumentException();
        }
        this.storage.put(item, repository);
    }

    public Map<String, String> getAllData(){
        return this.storage;
    }

    public String getRepository(String item){
        return this.storage.getOrDefault(item, null);
    }

    public Set<String> getItems(String repository){
        Set<String> resultSet = new HashSet<String>();

        for (Map.Entry<String, String> entry : this.storage.entrySet()) {
            if (entry.getValue().equals(repository)) {
                resultSet.add(entry.getKey());
            }
        }

        return resultSet;
    }
}