(ns ecommerce.handler
  (:import [org.bson.types ObjectId])
  (:require [ecommerce.config :as config]
            [ecommerce.db :as db]
            [ecommerce.response :as response]
            [ecommerce.utility :as util]
            [compojure.core :as cc]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [cheshire.core :as cheshire]
            [cheshire.generate :as generate :refer [add-encoder encode-str]]
            [ring.middleware.defaults :as rmd]
            [ring.util.response :as resp]))

(defn init []
  (db/db-setup config/host config/port config/db config/staging-db
               config/temp-db config/archive-db config/user config/pwd))

(cc/defroutes app-routes
  (cc/GET "/" [] (resp/redirect "/index.html"))
  (cc/GET "/accessory" [] (response/get-accessory-list))
  (cc/GET "/accessory/:id" [id] (response/get-accessory-entry id))
  (route/resources "/")
  (route/not-found "Not Found"))

(def app
    (rmd/wrap-defaults app-routes (assoc-in rmd/site-defaults [:security :anti-forgery] false)))
