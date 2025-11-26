FROM fluent/fluentd:v1.14
USER root
RUN gem install fluent-plugin-sqs fluent-plugin-out-http
COPY fluent.conf /fluentd/etc/fluent.conf