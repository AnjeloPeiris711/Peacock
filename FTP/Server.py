from twisted.cred.checkers import AllowAnonymousAccess,InMemoryUsernamePasswordDatabaseDontUse
from twisted.cred.portal import Portal
from twisted.internet import reactor
from twisted.protocols.ftp import FTPFactory,FTPRealm

checker = InMemoryUsernamePasswordDatabaseDontUse()
checker.addUser("junior","12345")
portal = Portal(FTPRealm("./public","./private"),[AllowAnonymousAccess(),checker])
factory = FTPFactory(portal)
factory.passive = True
factory.timeOut = 300

reactor.listenTCP(21,factory)
reactor.run()