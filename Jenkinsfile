pipeline {
    agent {
        label "ubuntu-1804"
    }

    environment {
        CI = "true"
        NPM_CONFIG_USERCONFIG=credentials("kaboodle-solutions-github-packages")
    }

    stages {
        stage("Install") {
            steps {
                sh "npm ci"
            }
        }
        stage("Build") {
            steps {
                sh "npm run build"
            }
        }
        stage("Lint") {
            steps {
                sh "npm run lint"
            }
        }
        stage("Test") {
            steps {
                sh "npm run test -- --no-cache --reporters=default --reporters=jest-junit --coverage"

                junit "junit.xml"

                step([
                    $class: "CloverPublisher",
                    cloverReportDir: "coverage",
                    cloverReportFileName: "clover.xml",
                    healthyTarget: [
                        methodCoverage: 95,
                        conditionalCoverage: 95,
                        statementCoverage: 95
                    ],
                    unhealthyTarget: [
                        methodCoverage: 70,
                        conditionalCoverage: 70,
                        statementCoverage: 70
                    ],
                ])

                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: "coverage/lcov-report",
                    reportFiles: "index.html",
                    reportName: "Coverage Report"
                ])
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
