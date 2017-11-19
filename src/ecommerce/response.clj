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
