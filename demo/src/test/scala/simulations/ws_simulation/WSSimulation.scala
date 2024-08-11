package simulations.ws_simulation

import io.gatling.core.Predef._ 
import io.gatling.http.Predef._
import scala.concurrent.duration._

import io.gatling.http.protocol.HttpProtocolBuilder

class WSSimulation extends Simulation {
  val httpProtocol: HttpProtocolBuilder = http.baseUrl("http://127.0.0.1:8000").wsBaseUrl("ws://127.0.0.1:8000")
    .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .acceptEncodingHeader("gzip, deflate")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0");


  val getAllCommands = scenario("getAllCommands")
    .exec(
        ws("connect_ws").connect("/ws")
        .onConnected(exec(ws("send_command")
            .sendText("""{"command": "get_all_commands"}""")
            .await(20)(ws.checkTextMessage("check_getAllCommands").check(jsonPath("$.msg")
            .ofType[String].is("set_user, get_user_by_name, get_all_users, get_all_commands, del_user_by_name").saveAs("myMessage")))
            ))
    )
    .exec(ws("closeConnection").close)


    val createCheckDelUser = scenario("createCheckDelUser")
    .exec(
        ws("connect").connect("/ws")
        .onConnected(
            exec(ws("create_user")
                .sendText("""{"command": "set_user", "first_name": "testname", "age": 2}""")
                .await(20)(ws.checkTextMessage("check_create_user").check(jsonPath("$.msg").ofType[String]
                .is("new user is add testname")))
            )
        )   
    )
    .exec(ws("get_user_by_name").sendText("""{"command": "get_user_by_name", "first_name": "testname"}""")
        .await(20)(ws.checkTextMessage("check_get_user_by_name").check(jsonPath("$.msg").ofType[String]
        .is("first_name testname age 2")
        ))
    )
    .exec(ws("get_all_users").sendText("""{"command": "get_all_users"}""")
        .await(20)(ws.checkTextMessage("check_get_all_users").check(jsonPath("$.msg").ofType[Int].is(1)
        ))
    )
    .exec(ws("double_del_user")
            .sendText("""{"command": "del_user_by_name", "first_name": "testname"}""")
            .await(20)(ws.checkTextMessage("check_double_del_user")
            .check(jsonPath("$.msg").is("del user ddeed is ok!")))   
        )
    .exec(ws("closeConnection").close)


    val bad_command = exec(ws("connect").connect("/ws"))
        .exec(ws("bad_command")
            .sendText("""{"command": "fdghfg"}""")
            .await(20)(ws.checkTextMessage("check_commands")
            .check(jsonPath("$.msg").is("wrong command fdghfg")))
        )
        .exec(ws("closeConnection").close)
    
    val bad_user_age = exec(ws("connect").connect("/ws"))
        .exec(ws("set_user")
            .sendText("""{"command": "set_user", "first_name": "ffdf"}""")
            .await(20)(ws.checkTextMessage("check_commands")
            .check(jsonPath("$.msg").is("wrong add user - wrong age")))
        )
        .exec(ws("closeConnection").close)

    val bad_user_name = exec(ws("connect").connect("/ws"))
        .exec(ws("bad_user_name")
            .sendText("""{"command": "set_user", "age": 5}""")
            .await(20)(ws.checkTextMessage("check_bad_user_name")
            .check(jsonPath("$.msg").is("wrong add user - wrong first_name")))
        )
        .exec(ws("closeConnection").close)
        
    val bad_user_get = exec(ws("connect").connect("/ws"))
        .exec(ws("bad_user_name")
            .sendText("""{"command": "get_user_by_name", "first_name": "ddd"}""")
            .await(20)(ws.checkTextMessage("check_bad_user_get")
            .check(jsonPath("$.msg").is("wrong name ddd")))
        )
        .exec(ws("closeConnection").close)

    val bad_doble_user = exec(ws("connect").connect("/ws"))
        .exec(ws("set_user1")
            .sendText("""{"command": "set_user", "first_name": "ddeed", "age": 22}""")
            .await(20)(ws.checkTextMessage("check_set_user1")
            .check(jsonPath("$.msg").is("new user is add ddeed")))
        )
        .exec(ws("set_user2")
            .sendText("""{"command": "set_user", "first_name": "ddeed", "age": 22}""")
            .await(20)(ws.checkTextMessage("check_set_user2")
            .check(jsonPath("$.msg").is("wrong add user - user alredy exists")))
        )
        .exec(ws("del_user")
            .sendText("""{"command": "del_user_by_name", "first_name": "ddeed"}""")
            .await(20)(ws.checkTextMessage("check_del_user")
            .check(jsonPath("$.msg").is("del user ddeed is ok!")))   
        )
        .exec(ws("double_del_user")
            .sendText("""{"command": "del_user_by_name", "first_name": "ddeed"}""")
            .await(20)(ws.checkTextMessage("check_double_del_user")
            .check(jsonPath("$.msg").is("user alredy not exists").saveAs("test")))   
        )
        .exec(ws("closeConnection").close)

    val bad_scn = scenario("test").exec(bad_command, bad_user_age, bad_user_get, bad_user_name, bad_doble_user)
    val base_user_scn = scenario("createCheckDelUser").exec(createCheckDelUser)
    val all_commands_scn = scenario("getAllCommands").exec(getAllCommands)

  setUp(
    base_user_scn.inject(rampUsersPerSec(10).to(20).during(10)).protocols(httpProtocol),
    bad_scn.inject(rampUsersPerSec(10).to(20).during(10)).protocols(httpProtocol),
    all_commands_scn.inject(rampUsersPerSec(10).to(20).during(10)).protocols(httpProtocol),
  )
}
