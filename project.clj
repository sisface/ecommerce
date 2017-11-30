(defproject ecommerce "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 ;; A routing library for REST APIs.
                 [compojure "1.5.1"]
                 ;; Handles JSON creation and parsing.
                 [cheshire "5.6.1"]
                 ;; Integration with MongoDB and a wrapper around
                 ;; java-mongo-driver.
                 [com.novemberain/monger "3.0.1"]
                 ;; A memoization library. Used for efficiently converting
                 ;; Clojure variable names to Javascript ones (kebab-case vs
                 ;; camelCase).
                 [org.clojure/core.memoize "0.5.8"]
                 ;; Used to create embedded Jetty web server.
                 [org.eclipse.jetty/jetty-servlet "7.6.1.v20120215"]
                 ;; Integrates Ring (what Compojure wraps) with jetty-servlet.
                 [ring/ring-jetty-adapter "1.3.2"]
                 ;; A collection of web server settings.
                 [ring/ring-defaults "0.2.1"]]
  :plugins [[lein-ring "0.9.7"]]
  :ring {:handler ecommerce.handler/app}
  :jvm-opts ["-Xmx12288m" "-XX:+UseConcMarkSweepGC" "-XX:-OmitStackTraceInFastThrow"]
  :main a2t-clj.handler
  :repl-options {:init-ns user
                 :init (ecommerce.handler/init)}
  :global-vars {*print-length* 100}
  :profiles {:dev {:resource-paths ["dev"]
                   :dependencies [[javax.servlet/servlet-api "2.5"]
                                  [org.clojure/tools.namespace "0.2.10"]
                                  [ring-mock "0.1.5"]]}
             :uberjar {:aot :all}})
