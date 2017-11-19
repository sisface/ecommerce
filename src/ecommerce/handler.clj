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
  (cc/GET "/flies" [] (response/get-flies-list))
  (cc/GET "/flies/:id" [id] (response/get-flies2-entry id))
  (cc/GET "/jig" [] (response/get-jig-list))
  (cc/GET "/jig/:id" [id] (response/get-jig-entry id))
  (cc/GET "/plugs" [] (response/get-plugs-list))
  (cc/GET "/plugs/:id" [id] (response/get-plugs-entry id))
  (cc/GET "/softbait" [] (response/get-softbait-list))
  (cc/GET "/softbait/:id" [id] (response/get-softbait-entry id))
  (cc/GET "/specialty" [] (response/get-specialty-list))
  (cc/GET "/specialty/:id" [id] (response/get-specialty-entry id))
  (cc/GET "/spinbuzz" [] (response/get-spinbuzz-list))
  (cc/GET "/spinbuzz/:id" [id] (response/get-spinbuzz-entry id))
  (cc/GET "/spinner" [] (response/get-spinner-list))
  (cc/GET "/spinner/:id" [id] (response/get-spinner-entry id))
  (cc/GET "/spoon" [] (response/get-spoon-list))
  (cc/GET "/spoon/:id" [id] (response/get-spoon-entry id))
  (route/resources "/")
  (route/not-found "Not Found"))

(def app
    (rmd/wrap-defaults app-routes (assoc-in rmd/site-defaults [:security :anti-forgery] false)))
