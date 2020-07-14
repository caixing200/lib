export default {
    getSysInfo() {
        var locator = new ActiveXObject("WbemScripting.SWbemLocator");
        var service = locator.ConnectServer(".");
        //CPU信息
        var cpu = new Enumerator(
            service.ExecQuery("SELECT * FROM Win32_Processor")
        ).item();
        var cpuType = cpu.Name,
            hostName = cpu.SystemName;
        //内存信息
        var memory = new Enumerator(
            service.ExecQuery("SELECT * FROM Win32_PhysicalMemory")
        );
        for (var mem = [], i = 0; !memory.atEnd(); memory.moveNext())
            mem[i++] = {
                cap: memory.item().Capacity / 1024 / 1024,
                speed: memory.item().Speed,
            };
        //系统信息
        var system = new Enumerator(
            service.ExecQuery("SELECT * FROM Win32_ComputerSystem")
        ).item();
        var physicMenCap = Math.ceil(system.TotalPhysicalMemory / 1024 / 1024),
            curUser = system.UserName,
            cpuCount = system.NumberOfProcessors;

        return {
            cpuType: cpuType,
            cpuCount: cpuCount,
            hostName: hostName,
            curUser: curUser,
            memCap: physicMenCap,
            mem: mem,
        };
    }
}