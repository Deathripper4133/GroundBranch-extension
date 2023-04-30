# GROUND BRANCH extension for Vortex

This extension provides support for GROUND BRANCH mods to be installed using Vortex.

It only supports mods that use one of the common layouts.

https://www.nexusmods.com/site/mods/412


## Notes for Users 

You will **NEED** to **MOVE** the **STAGING FOLDER** to the **SAME DRIVE** as **GROUND BRANCH** in order use **ANY MODS**. 

- Activate GROUND BRANCH > Settings > Mods > Staging folder* > Deployment Method*
    *   *Change Staging folder location so its in the same drive as GROUND BRANCH
    *   **Set the deployment method to HARDLINK 


If a mod was installed but is not working in-game 
- i.e patches not showing up in-game

Then it is likely the mod Folder Directory was not supported and was subsequently installed at:

    */steamapps/common/Ground Branch/{modfolder}

>Note that any mods that are moved will no longer be managable by Vortex. It is recommended to install unsupported mods manually.



## Notes for mod authors

Mods need to use one of the common layouts.

For example if we have:

    */steamapps/common/Ground Branch/GroundBranch/Content/GroundBranch/Mission/Tanker/TerroristHuntCustom.mis

It should be packaged as:

    GroundBranch/Content/GroundBranch/Mission/Tanker/TerroristHuntCustom.mis

or

    Content/GroundBranch/Mission/Tanker/TerroristHunt.mis

For compatibility, we also support these layouts.

1. MyFancyMod/Some/Extra/Directories/GroundBranch/Content/GroundBranch/Mission/Tanker/TerroristHuntCustom.mis
2. MyFancyMod/Some/Extra/Directories/Content/GroundBranch/Mission/Tanker/TerroristHuntCustom.mis

### Layout for PNG patches

Mods containing patches should look like this:

* GroundBranch/Content/GroundBranch/Patches/Morale/(Author)Funny.png
* Content/GroundBranch/Patches/Morale/(Author)Funny.png
* GroundBranch/Content/GroundBranch/Patches/CustomCategory/(Author)Name.png
* Content/GroundBranch/Patches/CustomCategory/(Author)Name.png

PNG files that are **not** stored in one of these layouts will be
installed to:

    GroundBranch/Content/GroundBranch/Patches/Various/

PNG files that do **not** have an `(Author)` will be installed to:

    */steamapps/common/Ground Branch/{modfolder} 



### Opting out of Vortex

If you do not want to follow the recommended layouts your mod will not
install properly. In this case please opt out of Vortex:

1. Go to "Mod details" > "File options (Optional)" 
2. Check the option "Remove the 'Download with manager' button" 

---



