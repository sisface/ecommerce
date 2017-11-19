(ns ecommerce.response
  (:import [org.bson.types ObjectId])
  (:require   [ecommerce.db :as db]
              [ecommerce.utility :as util]
              [cheshire.core :as cheshire]
              [cheshire.generate :as generate :refer [add-encoder encode-str]]))

(generate/add-encoder org.bson.types.ObjectId generate/encode-str)

(defn json-200 [to-render]
  {:status 200
   :headers {"Content-Type" "text/json; charset=utf-8"
             "Cache-Control" "no-cache, no-store, must-revalidate"
             "Pragma" "no-cache"
             "Expires" "0"}
   :body (cheshire/generate-string
          to-render {:key-fn #(util/memoized->camelCase (name %))})})

(defn json-404 [e]
  {:status 404
   :headers {"Content-Type" "text/json; charset=utf-8"
             "Cache-Control" "no-cache, no-store, must-revalidate"
             "Pragma" "no-cache"
             "Expires" "0"}
   :body (cheshire/generate-string e)})

(defn result-nil? [result]
  (if (nil? result)
    (json-404 "404 - Page not found")
    (json-200 result)))

(defn convert-to-object-id [id]
  (if (= ObjectId (class id))
    id (ObjectId. id)))

;;; Response endpoint functions.

(defn get-accessory-list []
  (try
    (let [result (db/get-maps "accessory")]
      (result-nil? result))
    (catch Exception e
      (json-404 (.toString e)))))

(defn get-accessory-entry [id]
  (try
    (let [result (db/get-by-id
                  "accessory"
                  (convert-to-object-id id))]
      (result-nil? result))
    (catch IllegalArgumentException e
      (json-404 (.toString e)))))

(defn get-flies-list []
  (try
    (let [result (db/get-maps "flies")]
      (result-nil? result))
    (catch Exception e
      (json-404 (.toString e)))))

(defn get-flies-entry [id]
  (try
    (let [result (db/get-by-id
                  "flies"
                  (convert-to-object-id id))]
      (result-nil? result))
    (catch IllegalArgumentException e
      (json-404 (.toString e)))))

(defn get-jig-list []
  (try
    (let [result (db/get-maps "jig")]
      (result-nil? result))
    (catch Exception e
      (json-404 (.toString e)))))

(defn get-jig-entry [id]
  (try
    (let [result (db/get-by-id
                  "jig"
                  (convert-to-object-id id))]
      (result-nil? result))
    (catch IllegalArgumentException e
      (json-404 (.toString e)))))

(defn get-plugs-list []
  (try
    (let [result (db/get-maps "plugs")]
      (result-nil? result))
    (catch Exception e
      (json-404 (.toString e)))))

(defn get-plugs-entry [id]
  (try
    (let [result (db/get-by-id
                  "plugs"
                  (convert-to-object-id id))]
      (result-nil? result))
    (catch IllegalArgumentException e
      (json-404 (.toString e)))))

(defn get-softbait-list []
  (try
    (let [result (db/get-maps "softbait")]
      (result-nil? result))
    (catch Exception e
      (json-404 (.toString e)))))

(defn get-softbait-entry [id]
  (try
    (let [result (db/get-by-id
                  "softbait"
                  (convert-to-object-id id))]
      (result-nil? result))
    (catch IllegalArgumentException e
      (json-404 (.toString e)))))

(defn get-specialty-list []
  (try
    (let [result (db/get-maps "specialty")]
      (result-nil? result))
    (catch Exception e
      (json-404 (.toString e)))))

(defn get-specialty-entry [id]
  (try
    (let [result (db/get-by-id
                  "specialty"
                  (convert-to-object-id id))]
      (result-nil? result))
    (catch IllegalArgumentException e
      (json-404 (.toString e)))))

(defn get-spinbuzz-list []
  (try
    (let [result (db/get-maps "spinbuzz")]
      (result-nil? result))
    (catch Exception e
      (json-404 (.toString e)))))

(defn get-spinbuzz-entry [id]
  (try
    (let [result (db/get-by-id
                  "spinbuzz"
                  (convert-to-object-id id))]
      (result-nil? result))
    (catch IllegalArgumentException e
      (json-404 (.toString e)))))

(defn get-spinner-list []
  (try
    (let [result (db/get-maps "spinner")]
      (result-nil? result))
    (catch Exception e
      (json-404 (.toString e)))))

(defn get-spinner-entry [id]
  (try
    (let [result (db/get-by-id
                  "spinner"
                  (convert-to-object-id id))]
      (result-nil? result))
    (catch IllegalArgumentException e
      (json-404 (.toString e)))))

(defn get-spoon-list []
  (try
    (let [result (db/get-maps "spoon")]
      (result-nil? result))
    (catch Exception e
      (json-404 (.toString e)))))

(defn get-spoon-entry [id]
  (try
    (let [result (db/get-by-id
                  "spoon"
                  (convert-to-object-id id))]
      (result-nil? result))
    (catch IllegalArgumentException e
      (json-404 (.toString e)))))
