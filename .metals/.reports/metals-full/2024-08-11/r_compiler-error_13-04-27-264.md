file://<WORKSPACE>/gatling-charts-highcharts-bundle-3.11.5/src/test/java/computerdatabase/ComputerDatabaseSimulation.java
### java.util.NoSuchElementException: next on empty iterator

occurred in the presentation compiler.

presentation compiler configuration:
Scala version: 3.3.3
Classpath:
<HOME>/.cache/coursier/v1/https/repo1.maven.org/maven2/org/scala-lang/scala3-library_3/3.3.3/scala3-library_3-3.3.3.jar [exists ], <HOME>/.cache/coursier/v1/https/repo1.maven.org/maven2/org/scala-lang/scala-library/2.13.12/scala-library-2.13.12.jar [exists ]
Options:



action parameters:
uri: file://<WORKSPACE>/gatling-charts-highcharts-bundle-3.11.5/src/test/java/computerdatabase/ComputerDatabaseSimulation.java
text:
```scala
package computerdatabase;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;

import java.util.concurrent.ThreadLocalRandom;

/**
 * This sample is based on our official tutorials:
 * <ul>
 *   <li><a href="https://gatling.io/docs/gatling/tutorials/quickstart">Gatling quickstart tutorial</a>
 *   <li><a href="https://gatling.io/docs/gatling/tutorials/advanced">Gatling advanced tutorial</a>
 * </ul>
 */
public class ComputerDatabaseSimulation extends Simulation {

    FeederBuilder<String> feeder = csv("search.csv").random();

    ChainBuilder search = exec(
        http("Home").get("/"),
        pause(1),
        feed(feeder),
        http("Search")
            .get("/computers?f=#{searchCriterion}")
            .check(
                css("a:contains('#{searchComputerName}')", "href").saveAs("computerUrl")
            ),
        pause(1),
        http("Select")
            .get("#{computerUrl}")
            .check(status().is(200)),
        pause(1)
    );

    // repeat is a loop resolved at RUNTIME
    ChainBuilder browse =
        // Note how we force the counter name, so we can reuse it
        repeat(4, "i").on(
            http("Page #{i}").get("/computers?p=#{i}"),
            pause(1)
        );

    // Note we should be using a feeder here
    // let's demonstrate how we can retry: let's make the request fail randomly and retry a given
    // number of times

    ChainBuilder edit =
        // let's try at max 2 times
        tryMax(2)
            .on(
                http("Form").get("/computers/new"),
                pause(1),
                http("Post")
                    .post("/computers")
                    .formParam("name", "Beautiful Computer")
                    .formParam("introduced", "2012-05-30")
                    .formParam("discontinued", "")
                    .formParam("company", "37")
                    .check(
                        status().is(
                            // we do a check on a condition that's been customized with
                            // a lambda. It will be evaluated every time a user executes
                            // the request
                            session -> 200 + ThreadLocalRandom.current().nextInt(2)
                        )
                    )
            )
            // if the chain didn't finally succeed, have the user exit the whole scenario
            .exitHereIfFailed();

    HttpProtocolBuilder httpProtocol =
        http.baseUrl("https://computer-database.gatling.io")
            .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
            .acceptLanguageHeader("en-US,en;q=0.5")
            .acceptEncodingHeader("gzip, deflate")
            .userAgentHeader(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0"
            );

    ScenarioBuilder users = scenario("Users").exec(search, browse);
    ScenarioBuilder admins = scenario("Admins").exec(search, browse, edit);

    {
        setUp(
            users.injectOpen(rampUsers(10).during(10)),
            admins.injectOpen(rampUsers(2).during(10))
        ).protocols(httpProtocol);
    }
}

```



#### Error stacktrace:

```
scala.collection.Iterator$$anon$19.next(Iterator.scala:973)
	scala.collection.Iterator$$anon$19.next(Iterator.scala:971)
	scala.collection.mutable.MutationTracker$CheckedIterator.next(MutationTracker.scala:76)
	scala.collection.IterableOps.head(Iterable.scala:222)
	scala.collection.IterableOps.head$(Iterable.scala:222)
	scala.collection.AbstractIterable.head(Iterable.scala:933)
	dotty.tools.dotc.interactive.InteractiveDriver.run(InteractiveDriver.scala:168)
	scala.meta.internal.pc.MetalsDriver.run(MetalsDriver.scala:45)
	scala.meta.internal.pc.WithCompilationUnit.<init>(WithCompilationUnit.scala:28)
	scala.meta.internal.pc.SimpleCollector.<init>(PcCollector.scala:373)
	scala.meta.internal.pc.PcSemanticTokensProvider$Collector$.<init>(PcSemanticTokensProvider.scala:61)
	scala.meta.internal.pc.PcSemanticTokensProvider.Collector$lzyINIT1(PcSemanticTokensProvider.scala:61)
	scala.meta.internal.pc.PcSemanticTokensProvider.Collector(PcSemanticTokensProvider.scala:61)
	scala.meta.internal.pc.PcSemanticTokensProvider.provide(PcSemanticTokensProvider.scala:90)
	scala.meta.internal.pc.ScalaPresentationCompiler.semanticTokens$$anonfun$1(ScalaPresentationCompiler.scala:117)
```
#### Short summary: 

java.util.NoSuchElementException: next on empty iterator