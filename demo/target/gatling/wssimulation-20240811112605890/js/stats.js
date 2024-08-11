var stats = {
    type: "GROUP",
name: "Global Information",
path: "",
pathFormatted: "group_missing-name-b06d1",
stats: {
    "name": "Global Information",
    "numberOfRequests": {
        "total": "3",
        "ok": "2",
        "ko": "1"
    },
    "minResponseTime": {
        "total": "0",
        "ok": "0",
        "ko": "11"
    },
    "maxResponseTime": {
        "total": "37446",
        "ok": "37446",
        "ko": "11"
    },
    "meanResponseTime": {
        "total": "12486",
        "ok": "18723",
        "ko": "11"
    },
    "standardDeviation": {
        "total": "17650",
        "ok": "18723",
        "ko": "0"
    },
    "percentiles1": {
        "total": "11",
        "ok": "18723",
        "ko": "11"
    },
    "percentiles2": {
        "total": "18729",
        "ok": "28085",
        "ko": "11"
    },
    "percentiles3": {
        "total": "33702",
        "ok": "35574",
        "ko": "11"
    },
    "percentiles4": {
        "total": "36697",
        "ok": "37072",
        "ko": "11"
    },
    "group1": {
    "name": "t < 800 ms",
    "count": 1,
    "percentage": 33
},
    "group2": {
    "name": "800 ms < t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t > 1200 ms",
    "count": 1,
    "percentage": 33
},
    "group4": {
    "name": "failed",
    "count": 1,
    "percentage": 33
},
    "meanNumberOfRequestsPerSecond": {
        "total": "0.079",
        "ok": "0.053",
        "ko": "0.026"
    }
},
contents: {
"req_test-098f6": {
        type: "REQUEST",
        name: "test",
path: "test",
pathFormatted: "req_test-098f6",
stats: {
    "name": "test",
    "numberOfRequests": {
        "total": "2",
        "ok": "2",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "0",
        "ok": "0",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "37446",
        "ok": "37446",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "18723",
        "ok": "18723",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "18723",
        "ok": "18723",
        "ko": "-"
    },
    "percentiles1": {
        "total": "18723",
        "ok": "18723",
        "ko": "-"
    },
    "percentiles2": {
        "total": "28085",
        "ok": "28085",
        "ko": "-"
    },
    "percentiles3": {
        "total": "35574",
        "ok": "35574",
        "ko": "-"
    },
    "percentiles4": {
        "total": "37072",
        "ok": "37072",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "count": 1,
    "percentage": 50
},
    "group2": {
    "name": "800 ms < t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t > 1200 ms",
    "count": 1,
    "percentage": 50
},
    "group4": {
    "name": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "0.053",
        "ok": "0.053",
        "ko": "-"
    }
}
    },"req_check1-3f268": {
        type: "REQUEST",
        name: "check1",
path: "check1",
pathFormatted: "req_check1-3f268",
stats: {
    "name": "check1",
    "numberOfRequests": {
        "total": "1",
        "ok": "0",
        "ko": "1"
    },
    "minResponseTime": {
        "total": "11",
        "ok": "-",
        "ko": "11"
    },
    "maxResponseTime": {
        "total": "11",
        "ok": "-",
        "ko": "11"
    },
    "meanResponseTime": {
        "total": "11",
        "ok": "-",
        "ko": "11"
    },
    "standardDeviation": {
        "total": "0",
        "ok": "-",
        "ko": "0"
    },
    "percentiles1": {
        "total": "11",
        "ok": "-",
        "ko": "11"
    },
    "percentiles2": {
        "total": "11",
        "ok": "-",
        "ko": "11"
    },
    "percentiles3": {
        "total": "11",
        "ok": "-",
        "ko": "11"
    },
    "percentiles4": {
        "total": "11",
        "ok": "-",
        "ko": "11"
    },
    "group1": {
    "name": "t < 800 ms",
    "count": 0,
    "percentage": 0
},
    "group2": {
    "name": "800 ms < t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t > 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group4": {
    "name": "failed",
    "count": 1,
    "percentage": 100
},
    "meanNumberOfRequestsPerSecond": {
        "total": "0.026",
        "ok": "-",
        "ko": "0.026"
    }
}
    }
}

}

function fillStats(stat){
    $("#numberOfRequests").append(stat.numberOfRequests.total);
    $("#numberOfRequestsOK").append(stat.numberOfRequests.ok);
    $("#numberOfRequestsKO").append(stat.numberOfRequests.ko);

    $("#minResponseTime").append(stat.minResponseTime.total);
    $("#minResponseTimeOK").append(stat.minResponseTime.ok);
    $("#minResponseTimeKO").append(stat.minResponseTime.ko);

    $("#maxResponseTime").append(stat.maxResponseTime.total);
    $("#maxResponseTimeOK").append(stat.maxResponseTime.ok);
    $("#maxResponseTimeKO").append(stat.maxResponseTime.ko);

    $("#meanResponseTime").append(stat.meanResponseTime.total);
    $("#meanResponseTimeOK").append(stat.meanResponseTime.ok);
    $("#meanResponseTimeKO").append(stat.meanResponseTime.ko);

    $("#standardDeviation").append(stat.standardDeviation.total);
    $("#standardDeviationOK").append(stat.standardDeviation.ok);
    $("#standardDeviationKO").append(stat.standardDeviation.ko);

    $("#percentiles1").append(stat.percentiles1.total);
    $("#percentiles1OK").append(stat.percentiles1.ok);
    $("#percentiles1KO").append(stat.percentiles1.ko);

    $("#percentiles2").append(stat.percentiles2.total);
    $("#percentiles2OK").append(stat.percentiles2.ok);
    $("#percentiles2KO").append(stat.percentiles2.ko);

    $("#percentiles3").append(stat.percentiles3.total);
    $("#percentiles3OK").append(stat.percentiles3.ok);
    $("#percentiles3KO").append(stat.percentiles3.ko);

    $("#percentiles4").append(stat.percentiles4.total);
    $("#percentiles4OK").append(stat.percentiles4.ok);
    $("#percentiles4KO").append(stat.percentiles4.ko);

    $("#meanNumberOfRequestsPerSecond").append(stat.meanNumberOfRequestsPerSecond.total);
    $("#meanNumberOfRequestsPerSecondOK").append(stat.meanNumberOfRequestsPerSecond.ok);
    $("#meanNumberOfRequestsPerSecondKO").append(stat.meanNumberOfRequestsPerSecond.ko);
}
