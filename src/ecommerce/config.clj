(ns ecommerce.config)

;; A flag specifying whether to communicate with MongoDB over SSL.
(def mongo-over-ssl false)

;; Local Datastore settings.
(def host "localhost")
(def port 27017)
(def db "ecommerce")
(def staging-db "staging")
(def temp-db "temp")
(def cred-db "admin")
(def archive-db "archive")
(def user "ircop")
(def pwd "ircop")

(def persisted-config (atom nil))
