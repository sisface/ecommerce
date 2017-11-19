(ns user
  (:import [org.bson.types ObjectId])
  (:require [clojure.pprint :as pprint]
            [ecommerce.config :as config]
            [ecommerce.db :as db]
            [ecommerce.handler :as handler]
            [ecommerce.response :as response]
            [ring.adapter.jetty :as jetty]))

(defn init []
  (db/db-setup config/host config/port config/db config/staging-db
               config/temp-db config/archive-db config/user config/pwd))

(defn boot
  ([join?] (jetty/run-jetty handler/app
                            {:join?        join?
                             :port         3000
                             :ssl?         false}))
  ([] (boot false)))
